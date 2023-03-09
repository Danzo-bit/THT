const User = require('../models/user')
const amountValidator = require('../validators/amount')
// Get wallet balance for current user
exports.balance = async(req, res) =>{
    // get user session
    const userId = req.session.user
    // validate user session
    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' })
      }
    //   get user
    const user = await User.findById(userId);
    if (!user) {
       return res.status(404).json({ error: 'User Wallet not found' })
    }
    // return user balance
    return res.status(201).json({ message: 'Successful', balance: user.balance })
}

//debit wallet for current user's transaction
exports.debit = async(req, res) =>{
    const userId = req.session.user

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' })
    }

    
    const validationMessage = amountValidator(req.body)
    // validate amount
    if (validationMessage !== true) {
        return res.status(400).json({ error: 'Invalid amount', message: validationMessage})
    }
    const {amount} = req.body
    //get wallet from db
    const user = await User.findById(userId)
    if (!user) {
    return res.status(404).json({ error: 'User Wallet not found' })
    }
    //check if debit amount is less than available balance
    if (user.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' })
    }

    user.balance -= amount
    await user.save()
    res.status(201).json({ message: 'Successful transaction',balance: user.balance })

}

// credit wallet balance for current user
exports.credit = async(req, res) => {
    const userId = req.session.user

    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' })
    }

    const validationMessage = amountValidator(req.body)
    // validate amount
    if (validationMessage !== true) {
        return res.status(400).json({ error: 'Invalid amount', message: validationMessage})
    }
    const {amount} = req.body
    //get wallet from db
    const user = await User.findById(userId);

    if (!user) {
    return res.status(404).json({ error: 'User Wallet not found' })
    }
    user.balance += amount
    await user.save()
    res.json({ message: 'Successful transaction', balance: user.balance })
}