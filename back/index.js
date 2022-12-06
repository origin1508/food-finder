import { app } from "./src/app";

app.listen(process.env.SERVER_PORT, () => {
  console.log("on");
});
