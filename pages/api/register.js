import Cors from "cors";
import axios from "axios";

const cors = Cors({
  methods: [],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { name, email, description } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "need params in request",
      });
    }
    try {
      const token = process.env.TOKEN;
      const baseUrl = process.env.BASE_URL;
      const reqDB =  await axios({
        url: baseUrl,
        method: "POST",
        data: {
          email,
          name,
          description,
        },
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "xc-token": token,
        },
      });
      console.log(reqDB)
      const messageUrl = process.env.WEBHOOK_URL;
      const reqWebHook = await axios({
        url: messageUrl,
        method: "POST",
        data: {
          username: "Visinha Fofoqueira",
          type: 1,
          content: `Ouvi dizer que: ${name} - está interessando no Meu Bairro`,
        },
      });
      console.log(reqWebHook)
      return res.status(200).json({
        message: "email saved",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "email saved",
    });
  }
  return res.status(405).json({ message: "method not allowed" });
}

