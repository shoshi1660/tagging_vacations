class UserModel {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public password: string,
        public role: string,
    ) { }

    // public static convertToFormData(user: UserModel): FormData {
    //     const myFormData = new FormData();
    //     myFormData.append("firstName", user.firstName);
    //     myFormData.append("lastName", user.lastName);
    //     myFormData.append("userName", user.userName);
    //     myFormData.append("password", user.password);
    //     return myFormData;
    // }

}

export default UserModel;