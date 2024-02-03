import { v2 as cloudinary } from "cloudinary";

export default new (class uploadToCloudinary {
	upload() {
		cloudinary.config({
			cloud_name: 'dji2n22ew',
			api_key: '477423629927378',
			api_secret: 'U_liy9CW4LUdSo19SHz9bpXtW78',
		});
	}

	async destination(image: any) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				"src/uploads/" + image,
				{
					folder: "circle-app",
				}
			);
			return cloudinaryResponse.secure_url;
		} catch (err) {
			throw err;
		}
	}
})();

