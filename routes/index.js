// var express = require("express");
// var router = express.Router();
// var Lop = require("../models/lop.model");
// /* GET home page. */
// router.get("/", async function (req, res) {
//   let lops = await Lop.find();
//   res.render("index", { lops: lops });
// });
// router.get("/create", (req, res) => {
//   res.render("create");
// });

// router.get("/update", (req, res) => {
//   res.render("update");
// });

// router.get("/delete", (req, res) => {
//   res.render("delete");
// });
// router.post("/", function (req, res, next) {
//   var newlop = new Lop();
//   newlop.tenlop = req.body.tenlop;
//   newlop.chuyennganh = req.body.chuyennganh;
//   newlop.gvcn = req.body.gvcn;
//   newlop.image = req.body.image;
//   newlop
//     .save()
//     .then(function () {
//       res.redirect("/");
//     })
//     .catch(function (err) {
//       if (err) {
//         console.log(err);
//       }
//     });
// });
// // Update Lớp
// router.post("/update", async (req, res) => {
//   //Use of async and arrow function
//   try {
//     //Use a try/catch block for cleaner error handling
//     let id = req.body.id;
//     const updateLop = await Lop.findByIdAndUpdate(
//       id,
//       {
//         tenlop: req.body.tenlop,
//         chuyennganh: req.body.chuyennganh,
//         gvcn: req.body.gvcn,
//         image: req.body.image,
//       },
//       { new: true } //< This option is important
//     );
//     res.redirect("/");
//   } catch (err) {
//     console.log("Error:", err);
//   }
// });
// router.get("/update/:id", async (req, res) => {
//   try {
//     const lop = await Lop.findById(req.params.id); // Lấy thông tin lớp theo ID
//     res.render("update", { lop }); // Truyền thông tin lớp vào trang cập nhật
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Có lỗi xảy ra khi lấy dữ liệu lớp.");
//   }
// });

// router.post("/delete", async (req, res) => {
//   try {
//     let id = req.body.id;
//     const deletedLop = await Lop.findByIdAndDelete(id);
//     res.redirect("/");
//   } catch (err) {
//     console.log(err);
//   }
// });

// module.exports = router;
var express = require("express");
var router = express.Router();

// Thay MongoDB bằng array tạm thời
let lops = []; // [{id: 1, tenlop: 'A', chuyennganh: 'CNTT', gvcn: 'Thầy A', image: 'link'}]
let nextId = 1;

/* GET home page */
router.get("/", function (req, res) {
  res.render("index", { lops });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/update/:id", (req, res) => {
  const lop = lops.find((l) => l.id === parseInt(req.params.id));
  if (!lop) return res.status(404).send("Không tìm thấy lớp");
  res.render("update", { lop });
});

router.get("/delete", (req, res) => {
  res.render("delete");
});

/* POST tạo lớp */
router.post("/", function (req, res) {
  const newLop = {
    id: nextId++,
    tenlop: req.body.tenlop,
    chuyennganh: req.body.chuyennganh,
    gvcn: req.body.gvcn,
    image: req.body.image,
  };
  lops.push(newLop);
  res.redirect("/");
});

/* POST update lớp */
router.post("/update", function (req, res) {
  const id = parseInt(req.body.id);
  const lop = lops.find((l) => l.id === id);
  if (lop) {
    lop.tenlop = req.body.tenlop;
    lop.chuyennganh = req.body.chuyennganh;
    lop.gvcn = req.body.gvcn;
    lop.image = req.body.image;
  }
  res.redirect("/");
});

/* POST delete lớp */
router.post("/delete", function (req, res) {
  const id = parseInt(req.body.id);
  lops = lops.filter((l) => l.id !== id);
  res.redirect("/");
});

module.exports = router;
