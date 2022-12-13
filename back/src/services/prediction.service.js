import { PythonShell } from "python-shell";

export default {
  runPrediction(imageFileName) {
    return new Promise((resolve, reject) => {
      try {
        PythonShell.run(
          "prediction.py",
          {
            mode: "text",
            pythonOptions: ["-u"],
            pythonPath: "",
            scriptPath: "./src/ml",
            args: [imageFileName],
            encoding: "utf8",
          },
          (err, results) => {
            if (err) throw err;
            const data = results[0].replace(`b\'`, "").replace(`\'`, "");
            const buffer = Buffer.from(data, "base64");
            const result = buffer.toString("utf-8");
            resolve(result);
          }
        );
      } catch (err) {
        reject();
      }
    });
  },
};
