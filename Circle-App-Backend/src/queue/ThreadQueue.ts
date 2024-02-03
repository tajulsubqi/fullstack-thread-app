import { Request, Response } from "express";
import MessageQueue from "../libs/rabbitmq";
import { Threads } from "../entities/threads";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
const cloudinary = require("cloudinary").v2;

type QueuePayload = {
  content: string;
  image: string;
  createdById: number;
};

export default new (class ThreadQueue {
	private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);
  async create(req: Request, res: Response) {

    try {
      const logginSession: any = res.locals.logingSession;

      const data = {
        content: req.body.content,
        image: req.file ? req.file.path : null,
      };

      // const { error, value } = createThreadSchema.validate(data);
      // if (error) return res.status(400).json({ error });
      //? upload cloudinary
      cloudinary.config({
        cloud_name: "dy61gkdwc",
        api_key: "911478842633956",
        api_secret: "gBAWD2G6I5i6MEOHl2OEJYzdQew",
      });

      if (req.file && req.file.path) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          data.image,
          { folder: "circle-app" }
        );
        data.image = cloudinaryResponse.secure_url;
      }
      const payload: QueuePayload = {
        content: data.content,
        image: data.image,
        createdById: logginSession.user.id,
      };

      const errorQueue = await MessageQueue.MessageSend(
        "thread-queue",
        payload
      );
      if (errorQueue)
        return res
          .status(500)
          .json({ message: "something error while sending message queue" });

		//   const createdThread = await this.ThreadRepository.save(payload);  

      return res.status(201).json({
        message: "Thread is queueds !",
        payload,
      });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
})();
