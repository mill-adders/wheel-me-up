/* eslint-disable no-unused-vars */
'use strict';
const express = require('express');

const car_company = require('../model/car-schema-model.js');
const userCar = require('../model/usercar-schema-model.js');


const router = express.Router();

router.get('/car-company', getCar);
router.get('/car-company/:_id', getCarByIdea);
router.post('/car-company', postCar);
router.put('/car-company/:_id', updatecar );
router.delete('/car-company/:_id', deletecar);
router.get('/user-car', get_rentCar);
router.post('/user-car', post_rentCar);
router.delete('/user-car/:_id', delete_rentCar);


let newCar = new car_company; 
let newUser = new userCar ; 
/////  read all data 
/**
 * function 
 * read all data ( means show hole data in our api )
 * @params {object} req 
 * @params {object} res 
 * @params {function} next 
 */
function getCar(req, res , next) {
  // console.log('hi')
  newCar.get()
    .then(data => {
      console.log('data in get function' , data);
            
      const results = {
        count: data.length,
        ourData: data,
      };
      res.status(200).json(results);
    })
    .catch(next);
}

/**
 * function 
 * read specific data about one item 
 * @params {object} req 
 * @params {object} res 
 * @params {function} next 
 */
function getCarByIdea(req, res, next) {
  // console.log('getby.id',newCar.get(req.params._id))
  newCar.get(req.params._id)
    .then(data => {
      console.log('results' , data);
      res.status(200).json(data);
    })
    .catch(next);
}

/**
 * function
 * create an object the hold information about our car app 
 * @params {object} req 
 * @params {object} res 
 * @params {function } next 
 */
function postCar(req, res, next) {
  newCar.create(req.body)
    .then(results =>{
      res.status(201).json(results);
    },
    )
    .catch(next);
}

/**
 * function
 * this function aupdate the information and returrn the new data 
 * @params {object} req 
 * @params {object} res 
 * @params {functions} next 
 */

function updatecar (req , res , next){
  console.log('req.body',req.body);
  newCar.update(req.params._id , req.body)
  // console.log('req.params.id',req.params._id);
  // console.log('req.body',req.body)
    .then( results =>{
      console.log('results', results);
      res.status(200).json(results);
    })
    .catch(next);
}
/**
 * function
 * it's delete an item 
 * @params {object } req 
 * @params { object} res 
 * @params { functions} next 
 */

function deletecar (req , res , next ){
  newCar.delete (req.params._id)
    .then( results => {
      res.status(200).json('iam delete');
    })
    .catch(next);
}
//////////////////////////////// rent-car function for api
/**
 * this function can create information about rent car 
 * @param {object} req 
 * @param {object} res 
 * @param {middleware functions} next 
 */
function post_rentCar (req , res , next){
  newUser.create(req.body)
    .then(results =>{
      res.status(201).json(results);
    })
    .catch(next);
}

/**
 *  this function show information "get info " about car that can be rented
 * @param {object} req 
 * @param {object} res 
 * @param {middleware functions} next 
 */
function get_rentCar(req , res , next){
  newUser.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}
/**
 * this function can delete information about rented car 
 * @param {object} req 
 * @param {object} res 
 * @param {middleware functions} next 
 */
function delete_rentCar (req ,res , next){
  // console.log('ffffff')
  newUser.delete(req.params._id)
    .then(data =>{
      res.status(200).json(data);

      // res.status(200).send('Deleted');
    })
    .catch(next);
}



module.exports = router;
