import mkdirp from "mkdirp";
import multer from "multer";
import Chat from "../Models/chatModel.js";
import Message from "../Models/MessageModel.js";
import User from "../Models/UserModel.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const uploadFile = (req, res) => {
  let upload = multer({
    storage: multer.diskStorage({
      destination: async function (req, file, cb) {
        mkdirp.sync(`./attachements/${req.sender}`);
        cb(null, `./attachements/${req.sender}`);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }).single("doc");

  upload(req, res, async function (err) {
    try {
      if (err) {
        console.log("api:", err);
      } else {
        console.log(req.file.originalname);
        // console.log(req.body.selectedChat);

        var newMessage = {
          sender: req.user._id,
          content: req.file.originalname,
          chat: req.body.chatId,
        };
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
          path: "chat.users",
          select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
          latestMessage: message,
        });
        const path = `http://localhost:3001/Attachements/${req.sender}/${req.file.originalname}`;

        res.json({ message, path });
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
};

export const getFile = async (req, res) => {
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    // console.log(dir);
    const __dirname = dirname(dir);
    // console.log(req.originalUrl);
    res.sendFile(path.join(__dirname, req.originalUrl));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
