import { getIO, getOnlineUsers } from "../../socket.js";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";


export const createChat = async (req, res) => {
  try {
    const { members, senderId, content, isGroupChat, groupName, groupAvatar, mediaFile } = req.body;
    // console.log("members-->", members);
    // console.log("senderId-->", senderId);

    if (!Array.isArray(members) || members.length < 2) {
      return res.status(400).json({ error: "At least two users required." });
    }

    let chat;

    chat = await Chat.findOne({
      isGroupChat: false,
      "members.user._id": { $all: members },
    }).where("members").size(members.length);
    
    if (!chat) {
      chat = new Chat({
        isGroupChat,
        members: members.map((userId) => ({ user: userId })), 
      });
      await chat.save();
    }
    
    // res.status(201).json({ chat });
    const message = await Message.create({
      chatId: chat._id,
      senderId,
      content,
      mediaFile,
    });

    chat.latestMessage = message._id;
    await chat.save();

    // Re-fetch the chat with population
    const populatedChat = await Chat.findById(chat._id)
      .populate({
        path: "members.user",
        select: "username avatar fullName"
      })
      .populate("latestMessage");

    res.status(201).json(populatedChat);
    
    
  } catch (error) {
    console.error("Error creating chat and sending message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { senderId, content, chatId, mediaFile } = req.body;

    const message = await Message.create({
      chatId,
      senderId,
      content,
      mediaFile,
    });

    // Update latestMessage in Chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    // Populate senderId
    await message.populate("senderId", "fullName avatar username");

    // Notify all members of the chat (except the sender)
    const chat = await Chat.findById(chatId).populate("members.user", "_id");

    const io = getIO();
    const onlineUsers = getOnlineUsers();

    chat.members.forEach(({ user }) => {
      if (user._id.toString() !== senderId && onlineUsers.has(user._id.toString())) {
        const socketId = onlineUsers.get(user._id.toString());
        io.to(socketId).emit("new-message", message);
      }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getUserChats = async (req, res) => {
  try {
    const userId  = req.user.userId;

    // Fetch all chats where user is a member
    const chats = await Chat.find({
      "members.user": userId,
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "senderId", // populate the sender inside latestMessage
        select: "username fullName avatar",
      },
    }) // Populate the latestMessage field with the Message data
      .populate({
        path: "members.user", // Populate the member user details
        select: "username avatar fullName", // Choose what to populate
      })
      .sort({ updatedAt: -1 }); // Sort by latest activity

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }

    const messages = await Message.find({ chatId })
      .populate("senderId", "username avatar fullName") // populate sender details
      .sort({ createdAt: 1 }); // sort by oldest first
      console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const markAllMessagesRead = async (req, res) => {
  try {
    await Message.updateMany(
      { chatId: req.params.chatId, senderId: { $ne: req.user.userId }, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error marking messages as read:", err);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
}






