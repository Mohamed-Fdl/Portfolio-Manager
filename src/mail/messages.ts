let userRegisterMail = (name : string,title : string) => {
    return {
        subject : 'Thanks for registring!!',
        html : '<p>Congrats Mr/Mme '+name+' for your registration.We wish you good luck for your job of '+title+' </p>'
    }
}

export {userRegisterMail}