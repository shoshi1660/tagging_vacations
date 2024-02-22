import { io, Socket } from "socket.io-client";

class VacationsConnect {
    // static disconnect() {
    //   throw new Error('Method not implemented.');
    // }
    // on(arg0: string, arg1: (vacations: any) => void) {
    //   throw new Error('Method not implemented.');
    // }
    // static connect() {
    //   throw new Error('Method not implemented.');
    // }

    public socket: Socket | undefined;

    public connect(): void {
        this.socket = io("http://localhost:4000");
    }

    public disconnect(): void {
        this.socket?.disconnect();
    }

    public send(vacations: any): void {
        debugger;
        this.socket?.emit("vacation-from-client", vacations);
    }

    public static vacationsConnect=new VacationsConnect()
}

export default VacationsConnect;