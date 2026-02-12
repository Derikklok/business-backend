import { Inventory } from "../models/Inventory";
import {
  CreateInventoryRequest,
  UpdateInventoryRequest,
} from "../types/inventory.types";

import { calculateInventory } from "../utils/inventoryCalculator";

/**
 * Create Inventory
 */
export const createInventory = async ({ body, set }: any) => {
  try {
    const dto = body as CreateInventoryRequest;

    const { items, subtotal, finalTotal } = calculateInventory(
      dto.items,
      dto.discount,
      dto.tax
    );

    const inventory = await Inventory.create({
      document: dto.documentId,

      items,

      subtotal,

      discount: dto.discount || 0,

      tax: dto.tax || 0,

      finalTotal,

      currency: dto.currency || "LKR",

      paymentOption: dto.paymentOption,
      paymentInfo: dto.paymentInfo,
    });

    return mapInventory(inventory);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

/**
 * Get Inventory By Document
 */
export const getInventoryByDocument = async ({ params, set }: any) => {
  try {
    const inventory = await Inventory.findOne({
      document: params.documentId,
    });

    if (!inventory) {
      set.status = 404;
      return { message: "Inventory not found" };
    }

    return mapInventory(inventory);
  } catch {
    set.status = 400;
    return { message: "Cannot fetch inventory" };
  }
};

/**
 * Update Inventory
 */
export const updateInventory = async ({ params, body, set }: any) => {
  try {
    const dto = body as UpdateInventoryRequest;

    const inventory = await Inventory.findById(params.id);

    if (!inventory) {
      set.status = 404;
      return { message: "Inventory not found" };
    }

    // Determine which discount and tax to use for calculation
    const newDiscount = dto.discount !== undefined ? dto.discount : inventory.discount;
    const newTax = dto.tax !== undefined ? dto.tax : inventory.tax;
    const itemsToCalc = dto.items || inventory.items;

    // Always recalculate final total if items, discount, or tax changes
    if (dto.items || dto.discount !== undefined || dto.tax !== undefined) {
      const calc = calculateInventory(itemsToCalc, newDiscount, newTax);

      if (dto.items) {
        inventory.items = calc.items as any;
        inventory.markModified('items');
      }

      inventory.subtotal = calc.subtotal;
      inventory.finalTotal = calc.finalTotal;
    }

    if (dto.discount !== undefined)
      inventory.discount = dto.discount;

    if (dto.tax !== undefined)
      inventory.tax = dto.tax;

    if (dto.paymentOption)
      inventory.paymentOption = dto.paymentOption;

    if (dto.paymentInfo)
      inventory.paymentInfo = dto.paymentInfo;

    if (dto.status)
      inventory.status = dto.status;

    await inventory.save();

    return mapInventory(inventory);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

/**
 * Delete Inventory
 */
export const deleteInventory = async ({ params, set }: any) => {
  await Inventory.findByIdAndDelete(params.id);

  return { message: "Inventory deleted" };
};

/**
 * Mapper
 */
const mapInventory = (inv: any) => ({
  id: inv._id.toString(),

  documentId: inv.document.toString(),

  items: inv.items.map((i: any) => ({
    id: i._id.toString(),
    description: i.description,
    unitPrice: i.unitPrice,
    quantity: i.quantity,
    unitType: i.unitType,
    value: i.value,
    notes: i.notes,
  })),

  subtotal: inv.subtotal,

  discount: inv.discount,

  tax: inv.tax,

  finalTotal: inv.finalTotal,

  currency: inv.currency,

  paymentOption: inv.paymentOption,

  paymentInfo: inv.paymentInfo,

  status: inv.status,

  createdAt: inv.createdAt.toISOString(),
  updatedAt: inv.updatedAt.toISOString(),
});
