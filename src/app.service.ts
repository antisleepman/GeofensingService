import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getGeozone() {
        return [{ id: 1, name: 'just for test' }]
    }
}