import { v4 as uuidv4 } from 'uuid';

function novoId() {
  return uuidv4();
}

export {
  novoId
}