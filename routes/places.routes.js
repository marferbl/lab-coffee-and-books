const router = require("express").Router();
const Place = require("../models/places.model");
const express = require("express");

router.get("/places", (req, res, next) => {
  Place.find()
    .then((allplaces) => {
      res.render("places", { allplaces: allplaces });
    })
    .catch((err) => console.log(err));
});

router.get("/places/create", (req, res) => {
  Place.find().then((places) => {
    res.render("new-place", { places: places });
  });
});

router.post("/places/create", (req, res) => {
  const { name, type, lat, lng } = req.body;
  let location = {
    type: "Point",
    coordinates: [lat, lng],
  };
  Place.create({ name, type, location })
    .then((place) => {
      console.log(place);
      res.redirect("/places");
    })
    .catch(() => res.render("places/new-place"));
});

router.get("/places/:id/details", (req, res) => {
  const { id } = req.params;

  Place.findById(id).then((place) => {
    res.render("place-details", place);
  });
});

router.get("/places/:id/delete", (req, res) => {
  const { id } = req.params;

  Place.findByIdAndRemove(id).then(() => res.redirect("/places"));
});

router.get("/places/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id);

  Place.findById(id).then((place) => {
    
    res.render("edit-place", place);
  });
});

router.post("/places/:id", (req, res) => {
  const { id } = req.params;

  Place.findByIdAndUpdate(id, req.body).then((updatedPlace) => {
    console.log(updatedPlace);

    res.redirect("/places");
  });
});

module.exports = router;

//

router.get("/show-map", (req, res, next) => {
  Place.find()
    .then((allplaces) => {
        
      res.render("show-map", { allplaces: allplaces });
      
    })
    .catch((err) => console.log(err));
});


router.get("/api/show-map", (req, res, next) => {
  Place.find()
    .then((places) => {
        // console.log(places)
      res.status(200).json({ places: places });
    })
    .catch((err) => console.log(err));
});

