const fs = require("fs");

const stats = fs.stat("cerc.pdf", (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.isFile())
  console.log(stats.isDirectory())
  console.log(stats.isSymbolicLink())
  console.log(stats.ctime)
  console.log(stats.size)
});
