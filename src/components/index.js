import ImageView from './ImageView/index.vue'
import sku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('ImageView', ImageView)
        app.component('sku',sku)
    }
}