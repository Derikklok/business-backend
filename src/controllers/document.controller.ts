import { Document } from "../models/Document";
import {
  CreateDocumentRequest,
  DocumentResponse,
  UpdateDocumentRequest,
} from "../types/document.types";
import { generateDocumentNo } from "../utils/documentNoGenerator";

export const createDocument = async ({ body, set }: any) => {
  try {
    const dto = body as CreateDocumentRequest;
    // Auto generate document no
    const documentNo = await generateDocumentNo(dto.documentType);
    const doc = await Document.create({...dto,documentNo});
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

export const getDocumentById = async ({ params, set }: any) => {
  const doc = await Document.findById(params.id);
  if (!doc) {
    set.status = 404;
    return { message: "Document not found" };
  }

  return mapDocument(doc);
};

// Update Document
export const updateDocument = async ({ params, set, body }: any) => {
  try {
    // Explicitly remove documentType from the request body - user can not chnage the doc type
    const { documentType, ...updateFields } = body;
    
    const doc = await Document.findByIdAndUpdate(params.id, updateFields, { new: true });

    if (!doc) {
      set.status = 404;
      return { message: "Document not found" };
    }

    return mapDocument(doc);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

// Delete document
export const deleteDocument = async ({ params, set }: any) => {
  const doc = await Document.findByIdAndDelete(params.id);

  if (!doc) {
    set.status = 404;
    return { message: "Document not found" };
  }

  return { message: "Document deleted" };
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
