const Offers = require("../models/offerModel");
const User = require("../models/userModel")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("./userController")
dotenv.config()

// get all offers
exports.getOffers = (req, res) => {
    verifyUser(req, res, () => {
        Offers.find()
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    })
}

// fetch offer by id
exports.getOfferById = async (req, res) => {

    const id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail });
    Offers.findById(id)
        .then((data) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: process.env.HOST,
                port: process.env.GMAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.PASSWORD
                },
            });

            const mailOptions = {
                from: {
                    name: 'Latest Offers',
                    address: process.env.EMAIL_ADDRESS
                },
                to: [user.email],
                subject: 'Latest Offers for you',
                html: `<h1>${data.title}</h1>
                        <p>Description: ${data.description}</p>
                        <p>Location: ${data.location}</p>
                        <p>Expiry Date: ${data.expiry_date}</p>
                `
            }

            const sendMail = async (transporter, mailOptions) => {
                try {
                    await transporter.sendMail(mailOptions);

                } catch (error) {
                    console.log(error)
                }
            }

            sendMail(transporter, mailOptions);
            res.status(200).json({
                message: "Offer sent successfully"
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
}

// Add offers
exports.addOffer = (req, res) => {
    verifyUser(req, res, () => {
        const NewOffer = req.body;
        if (NewOffer != null) {
            Offers.create(NewOffer)
                .then((response) => {
                    res.status(201).send(response)
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).send(error)
                })

        } else {
            res.status(400).send(`Empty data cannot be added`)
        }
    })
}

