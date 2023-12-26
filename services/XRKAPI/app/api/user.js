const mongoose = require('mongoose');
const api = {};
api.setup = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        cart: {}
    });

    admin.save()
        .then(() => {
            console.log('Admin account was succesfully set up');
            res.json({ success: true });
        })
        .catch((error) => error)
}

api.index = (User, XRKToken) => (req, res) => {
    const token = XRKToken;
    if (token) {
        User.find()
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((error) => error)

    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.signup = (User) => (req, res) => {
    if (!req.body.username || !req.body.password) res.json({ success: false, message: 'Please, pass a username and password.' });
    else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            cart: {}
        });
        newUser.save()
            .then(() => {
                res.json({ success: true, message: 'Account created successfully' });
            })
            .catch(() => {
                return res.status(400).json({ success: false, message:  'Username already exists.' })
            })

    }
}

api.add_to_cart = (User) => (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ success: false, message:  'You need to authenticate first .' })
    }
    else {

        // Object.assign(new_cart, req.body.cart)

        User.findOne({username: req.body.username})
            .then((user) => {
                if (user === null) {
                    res.json({success: false, message: 'User not found.'})
                    return null
                }
                return structuredClone(user.cart)
            })
            .then((old_cart) => {
                if (old_cart === null) return null
                if (req.body.cart === null) {
                    res.json({
                        success: true,
                        message: 'CART LOADED successfully',
                        cart: old_cart
                    });
                    return null
                }
                let isIn = false
                if(old_cart !== undefined){
                    for(let item in old_cart) {
                        if (item === Object.keys(req.body.cart)[0]){
                            old_cart[item] = old_cart[item] + 1
                            return old_cart
                        }
                    }
                    return Object.assign(old_cart, req.body.cart)
                }else{
                    return req.body.cart
                }
            })
            .then((cart) => {
                if (cart === null) return null
                User.findOneAndUpdate({username: req.body.username}, {cart: cart})
                    .then(() => {

                        res.json({
                            success: true,
                            message: 'CART UPDATED successfully',
                            cart: cart
                        });
                    })
                    .catch(() => {
                        return res.status(400).json({ success: false, message:  'CART NOT UPDATED .' })
                    })

            })
            .catch((error) => {
                throw error;
            })

        // User.findOneAndUpdate({username: req.body.username}, {cart: new_cart})
        //     .then(() => {
        //
        //         res.json({
        //             success: true,
        //             message: 'CART UPDATED successfully',
        //             cart: req.body.cart
        //         });
        //     })
        //     .catch(() => {
        //         return res.status(400).json({ success: false, message:  'CART NOT UPDATED .' })
        //     })

    }
}

module.exports = api;

