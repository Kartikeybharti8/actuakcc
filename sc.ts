
import { generate } from './randomNo';
import { Firebase } from './firebaseFunction';

const PROTO_PATH = __dirname + '/Chk.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const app = grpc.loadPackageDefinition(packageDefinition);
const chkpackage = app.chkpackage;

const server = new grpc.Server();

server.bind("0.0.0.0:40000",
  grpc.ServerCredentials.createInsecure());




const createRoomCode= async(call: string, callBack: any) =>{
  

  // have to add meta functionality
  const status = grpc.status;
  if (!call) return callBack({ code: status.UNAUTHENTICATED, message: 'No header' });
  const fire = new Firebase();
   //const user = await fire.getUser(call).catch((err) => console.log(err));
  //also can add data to firestore now 
   const user=generate();
  callBack(null, { "Code": user });
}


server.addService(chkpackage.ChineseCheckers.service,
  {
    'createRoomCode': createRoomCode,

  }
)
const promise1 = new Promise((resolve, reject) => {
  
  if(!server.start()){
  resolve('Success!');
  }
  
});

promise1.then((value) => {
  console.log(value);
  // expected output: "Success!"
});