export class VacationModel {
      constructor(
        public vacationId: number,
        public description: string,
        public destination: string,
        public Image:any,
        public startDate: Date,
        public endDate: Date,
        public price: number,
        public amountFollowers: number
    ) { }
     public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        // myFormData.append("vacationId", vacation.vacationId.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("Image", vacation.Image[0].name);
        myFormData.append("startDate", vacation.startDate.toString());
        myFormData.append("endDate", vacation.endDate.toString());
        myFormData.append("price", vacation.price.toString());
        // myFormData.append("amountFollowers", vacation.amountFollowers.toString());
       
        return myFormData;
    }

}

