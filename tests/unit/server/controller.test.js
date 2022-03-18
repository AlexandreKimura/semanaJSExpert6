import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import { Controller } from "../../../server/controller.js";
import { Service } from "../../../server/service.js";
import TestUtil from "../../_util/testUtil.js";

import config from "../../../server/config.js";
const {
  dir: { publicDirectory },
} = config;

describe("#Controller - unit tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Get File Stream", async () => {
    const controller = new Controller();

    const mockFile = "test.xls";
    const mockFileType = ".xls";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
        type: mockFileType,
      });

    const response = await controller.getFileStream(mockFile);

    expect(response.stream).toEqual(mockFileStream);
    expect(response.type).toEqual(mockFileType);
  });
});
