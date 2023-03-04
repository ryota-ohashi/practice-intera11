import '../scss/style.scss';
import p5 from "p5";

import { sketch } from "./modules/sketch";
import { menu } from "./modules/menu";

new p5(sketch);
menu();