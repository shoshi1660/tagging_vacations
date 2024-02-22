class FollowModel {
    va: any;
    constructor(
        public followingId: number,
        public id: number,
        public vacationId: number,
    ) { }

    // public static convertToFormData(follow: FollowModel): FormData {
    //     const myFormData = new FormData();
    //     myFormData.append("id", follow.id.toString());
    //     myFormData.append("vacationId", follow.vacationId.toString());
    //     return myFormData;
    // }

}

export default FollowModel;