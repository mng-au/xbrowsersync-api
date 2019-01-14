import { Container } from "inversify";
import { TYPES } from "./types";
import { IConfig } from "./interfaces";
import { Config } from "./entities";

const myContainer = new Container();
myContainer.bind<IConfig>(TYPES.Config).to(Config);
export { myContainer };