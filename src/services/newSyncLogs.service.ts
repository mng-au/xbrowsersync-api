import { Request } from "express";

import Config from "../core/config";
import { NewSyncLogs } from "../core/dbentities";
import { ClientIpAddressEmptyException, UnspecifiedException } from "../core/exception";
import { INewSyncLogs } from "../core/interfaces";
import { LogLevel } from "../core/server";
import BaseService from "./base.service";
import * as uuid from "uuid/v4"

// Implementation of data service for new sync log operations
export default class NewSyncLogsService extends BaseService<void> {
  // Creates a new sync log entry with the supplied request data
  public async createLog(req: Request): Promise<INewSyncLogs> {
    // Get the client's ip address
    const clientIp = this.getClientIpAddress(req);
    if (!clientIp) {
      const err = new ClientIpAddressEmptyException();
      this.log(LogLevel.Error, "Exception occurred in NewSyncLogsService.createLog", req, err);
      throw err;
    }

    // Create new sync log payload
    const newLogPayload: INewSyncLogs = {
      _id: uuid(),
      ipAddress: clientIp
    };
    const newSyncLogsModel = new NewSyncLogs(newLogPayload);

    // Commit the payload to the db
    try {
      await NewSyncLogs.save(newSyncLogsModel);
    }
    catch (err) {
      this.log(LogLevel.Error, "Exception occurred in NewSyncLogsService.createLog", req, err);
      throw err;
    }

    return newLogPayload;
  }

  // Returns true/false depending on whether a given request's ip address has hit the limit for daily new syncs created
  public async newSyncsLimitHit(req: Request): Promise<boolean> {
    // Get the client's ip address
    const clientIp = this.getClientIpAddress(req);
    if (!clientIp) {
      const err = new ClientIpAddressEmptyException();
      this.log(LogLevel.Error, "Exception occurred in NewSyncLogsService.newSyncsLimitHit", req, err);
      throw err;
    }

    let newSyncsCreated = -1;

    // Query the newsynclogs collection for the total number of logs for the given ip address
    try {
      newSyncsCreated = await NewSyncLogs.countDocuments({ ipAddress: clientIp });
    }
    catch (err) {
      this.log(LogLevel.Error, "Exception occurred in NewSyncLogsService.newSyncsLimitHit", req, err);
      throw err;
    }

    // Ensure a valid count was returned
    if (newSyncsCreated < 0) {
      const err = new UnspecifiedException("New syncs created count cannot be less than zero");
      this.log(LogLevel.Error, "Exception occurred in NewSyncLogsService.newSyncsLimitHit", req, err);
      throw err;
    }

    // Check returned count against config setting
    return newSyncsCreated >= Config.get().dailyNewSyncsLimit;
  }

  // Extracts the client's ip address from a given request
  private getClientIpAddress(req: Request): string {
    if (!req || !req.ip) {
      return;
    }

    return req.ip;
  }
}