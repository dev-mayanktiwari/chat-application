import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);  
    }
    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatParticipantId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, chatParticipantId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    console.log(conversation);
    res.status(200).json({
      messages: conversation.messages,
    });
  } catch (error) {
    console.log("Error in getMessage controller", error);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
};
