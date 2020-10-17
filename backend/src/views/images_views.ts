import Image from "../models/Image";

export default {
  render(image: Image) {
    return {
      id: image.id,
      path: `http://192.168.15.25:3333/uploads/${image.path}`,
    }
  },

  renderMany(images: Image[]) {
    return images.map(images => this.render(images))
  }
}