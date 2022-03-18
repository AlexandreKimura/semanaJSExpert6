import fs from "fs";
import fsPromises from "fs/promises";

import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import { Service } from "../../../server/service.js";
import TestUtil from "../../_util/testUtil.js";

import config from "../../../server/config.js";
const {
  dir: { publicDirectory },
} = config;

describe("#Service - unit tests", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Create File Stream", async () => {
    const service = new Service();
    const mockFile = "test.xls";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fs, fs.createReadStream.name).mockReturnValue(mockFileStream);

    const response = service.createFileStream(mockFile);

    expect(response).toEqual(mockFileStream);
    expect(fs.createReadStream).toHaveBeenCalledWith(mockFile);
  });

  test("Get File Info", async () => {
    const service = new Service();
    const mockFile = "test.xls";
    const mockExt = ".xls";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fsPromises, fsPromises.access.name).mockResolvedValue({
      mockFileStream,
    });

    const response = await service.getFileInfo(mockFile);

    expect(response.name).toEqual(`${publicDirectory}/${mockFile}`);
    expect(response.type).toEqual(`${mockExt}`);
  });

  test("Get File Stream", async () => {
    const service = new Service();
    const mockFilename = "test.xls";
    const mockFile = `${publicDirectory}/${mockFilename}`;
    const mockExt = ".xls";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fsPromises, fsPromises.access.name).mockResolvedValue({
      mockFileStream,
    });

    await service.getFileInfo(mockFile);
    jest
      .spyOn(service, service.createFileStream.name)
      .mockReturnValue(mockFile);

    const response = await service.getFileStream(mockFile);
    expect(response.stream).toEqual(mockFile);
    expect(response.type).toEqual(`${mockExt}`);
  });
});
