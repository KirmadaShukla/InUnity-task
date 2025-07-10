exports.sendToken = (user, statusCode, res) => {
    const token = user.generateJWT();
    const expiresInMilliseconds = process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000;

    const options = {
        expires: new Date(Date.now() + expiresInMilliseconds),
        httpOnly: true,
    };

    // Exclude password from user object
    const userObj = user.toObject();
    delete userObj.password;

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: userObj,
            expiresIn: expiresInMilliseconds
        });
};