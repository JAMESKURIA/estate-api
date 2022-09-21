// var stream = require("stream");
// const fs = require("fs");

// class LogStream extends stream.Writable {
//   _write(chunk, enc, next) {
//     // console.log(chunk.toString());

//     fs.writeFileSync(
//       "file.txt",
//       chunk
//         .toString()
//         .replace(
//           /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
//           ""
//         ),
//       { flag: "a+" },
//       (err) => {}
//     );
//     next();
//   }
// }
// const { Signale } = require("signale");

// const options = {
//   stream: new LogStream(),
// };

// const signale = new Signale(options);
// signale.success("Message will appear on `process.stderr`");
// signale.error(
//   "Message will appear on both `process.stdout` & `process.stderr`"
// );
// signale.error("ererer");

const items = {
  a: 1,
  b: 0,
  c: "1",
};

// console.log([(1, 1, 1)].every(Boolean));

// console.log(![(null, 0, 0)].every(Boolean));

console.log(
  Object.values(items)
    // .map((key) => items[key])
    .every(Boolean)
);
