import { Document } from "../models/Document";
import {
  CreateDocumentRequest,
  DocumentResponse,
} from "../types/document.types";

export const createDocument = async ({ body, set }: any) => {
  try {
    const dto = body as CreateDocumentRequest;

    const doc = await Document.create(dto);
    return mapDocument(doc);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

export const getDocuments = async ({ set }: any) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    return docs.map(mapDocument);
  } catch (err: any) {
    set.status = 400;
    return { message: "Can not fecth documents" };
  }
};

/**
 * Mapper
 */
const mapDocument = (doc: any): DocumentResponse => ({
  id: doc._id.toString(),

  documentType: doc.documentType,
  documentNo: doc.documentNo,

  mentionedDate: doc.mentionedDate.toISOString(),
  createdDate: doc.createdAt.toISOString(),

  documentTitle: doc.documentTitle,

  specialNotes: doc.specialNotes,
  termsAndConditions: doc.termsAndConditions,

  signature: doc.signature,

  status: doc.status,

  transactionInfo: {
    state: doc.transactionInfo.state,
    paidDate: doc.transactionInfo.paidDate
      ? doc.transactionInfo.paidDate.toISOString()
      : undefined,
  },

  documentAuthor: doc.documentAuthor,

  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});
