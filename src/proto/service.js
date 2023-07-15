import {WebadminServiceClient} from './webadmin_grpc_web_pb';

export const service = new WebadminServiceClient('http://localhost:8080');
