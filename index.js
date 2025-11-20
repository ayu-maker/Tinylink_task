import express from "express";
import { PrismaClient } from "@prisma/client";
import linkRoutes from "./src/routes/link.js";

const app=express();
const prisma = new PrismaClient();


app.use(express.json());

app.use("/api/links",linkRoutes);

app.use(express.static("public"))

//system healthcheck endpoint
app.get("/healthz",(req,res)=>{
  const uptimeSeconds=process.uptime();
  const uptime={
    seconds:uptimeSeconds,
    minutes:(uptimeSeconds/60).toFixed(2),
    hours:(uptimeSeconds/300).toFixed(2),
  };
  res.status(200).json({
    ok:true,
    version:"1.0",
    uptime,
    timestamp:new Date().toISOString(),
    platform:process.platform,
    nodeVersion:process.version,
    memoryUsage:process.memoryUsage(),
    cpuUsage:process.cpuUsage()
  });
});
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link) return res.status(404).send("Not found");

    let target = link.url;
    if (!/^https?:\/\//i.test(target)) target = "http://" + target;

    // increment link clicked count
    await prisma.link.update({
      where: { code },
      data: { clicks: { increment: 1 }, lastClicked: new Date() },
    });

    return res.redirect(302, target);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Internal Server error");
  }
});

app.listen(3000,()=> console.log("Server running on port 3000"));