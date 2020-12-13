// This is the interface as the document used by the frontend but is uniquely named to reduce
// coupling between the service and other application logic.
// TODO share this interface between the client and server
export interface FunctionDocument {
  name: string;
  size: number;
}

export interface Document {
  name: string;
  size: number;
}
