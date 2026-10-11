import { describe, test } from "node:test";
import { deepStrictEqual } from "node:assert";
import { filterInvoices, initialInvoices, paginate } from "./data";

describe("invoice controls", () => {
  test("finds an invoice by its identifier", () => {
    deepStrictEqual(filterInvoices(initialInvoices, "INV-2026-09-003", "all", "all").map(invoice => invoice.id), ["INV-2026-09-003"]);
  });
  test("combines company, month, and separate search terms", () => {
    const result = filterInvoices(initialInvoices, "XYZ 003", "XYZ Transport", "September 2026");
    deepStrictEqual(result.map(invoice => invoice.id), ["INV-2026-09-003"]);
    deepStrictEqual(filterInvoices(initialInvoices, "XYZ 003", "UBK Towing", "September 2026"), []);
  });
  test("returns an empty result for a nonmatching month", () => {
    deepStrictEqual(filterInvoices(initialInvoices, "", "all", "July 2026"), []);
  });
  test("pagination returns the next seven records without overlap", () => {
    deepStrictEqual(paginate(initialInvoices, 2).map(invoice => invoice.id), [
      "INV-2026-09-008",
      "INV-2026-09-009",
      "INV-2026-09-010",
      "INV-2026-09-011",
      "INV-2026-09-012",
      "INV-2026-09-013",
      "INV-2026-09-014",
    ]);
  });
});
