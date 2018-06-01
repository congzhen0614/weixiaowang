<template>
	<input ref="file" type="file" name="image" accept="image/*" @change="handleChange($event)">
</template>

<script>
	export default {
		data () {
			return {
				// 图片文件
				imgFile: {}
			}
		},
		methods: {
			// 点击上传
			uploadFile () {
				this.$refs.file.click()
			},
			handleChange (event) {
				console.log(event)
				// 当前文件
				let file = event.target.files[0]
				// 规定图片大小限制
				const imgMaxSize = 1024 * 1024 * 10 // 10Mb
				// 允许文件类型列表
				const fileTypeList = ['jpeg', 'jpg', 'png', 'gif']
				// 检查文件类型
				if (fileTypeList.indexOf(file.type.split('/')[1]) < 0) {
					// 不符合
					this.Toast.warning({
						title: '请上传标准格式的图片'
					})
					return false
				}
				// 检查文件大小
				if (file.size > imgMaxSize) {
					// 不符合
					this.Toast.warning({
						title: '图片大小超过限制'
					})
					return false
				}
				// 转化成 dataUrl
				// this.transformFileToDataUrl(file)
				// 上传到阿里云OSS服务器
				this.uploadOss()
			},
			// 上传到OSS服务器
			uploadOss (file) {
				// 上传的 key 值
				let storeAs = 'upload-name'
				// 服务器地址
				// let serverUrl = location.protocol + '//oss-cn-hangzhou.aliyuncs.com'
				let serverUrl = location.protocol + '//www.res.51weixiao.com'
				window.OSS.urllib.request(serverUrl, {
					method: 'GET'
				}, (err, response) => {
					console.log(err)
					if (err) {
						return alert(JSON.stringify(err))
					}
					// 获取结果
					let result = {}
					try {
						result.JSON.parse(response)
					} catch (e) {
						return alert('parse sts response info error: ' + e.message)
					}
					// 建立客户端
					let client = new window.OSS.Wrapper({
						accessKeyId: result.AccessKeyId,
						accessKeySecret: result.AccessKeySecret,
						stsToken: result.SecurityToken,
						endpoint: serverUrl,
						bucket: 'wiexiao'
					})
					// 上传文件
					client.multipartUpload(storeAs, file).then(result => {
						console.log(result)
					}).catch(err => {
						console.log(err)
					})
				})
			},
			// 转换成 dataUrl
			transformFileToDataUrl (file) {
				// 最大尺寸
				const imgCompassMaxSize = 200 * 1024 // 222Kb
				// 存储文件相关信息
				this.imgFile.type = file.type || 'image/jpg'
				this.imgFile.size = file.size
				this.imgFile.name = file.name
				this.imgFile.lastModifiedDate = file.lastModifiedDate
				// 封装好的函数
				const reader = new FileReader()
				// file转dataUrl 是一个异步函数，要将代码写在回调里
				reader.onload = e => {
					const result = e.target.result
					this.picList.push(result)
					// 判断大小
					if (result.length < imgCompassMaxSize) {
						this.compress(result, this.processData, false) // 图片不压缩
					} else {
						this.compress(result, this.processData) // 图片压缩
					}
				}
				// 执行读取操作，再上面回调接收
				reader.readAsDataURL(file)
			},
			// 压缩文件
			compress (dataURL, callback, shouldCompress) {
				const img = new Image()
				img.src = dataURL
				img.onload = () => {
					// 创建画布
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')
					// 填充画布大小
					canvas.width = img.width
					canvas.height = img.height
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
					// 压缩的dataURL
					let compressedDataUrl = shouldCompress ? canvas.toDataURL(this.imgFile.type, 0.2) : canvas.toDataURL(this.imgFile.type, 1)
					// 回调
					callback(compressedDataUrl)
				}
			},
			// 出来 dataUrl
			processData (dataUrl) {
				// 这里使用二进制方式处理 dataUrl
				const binaryString = window.atob(dataUrl.split(',')[1])
				// 转换成 buffer
				const arrayBuffer = new ArrayBuffer(binaryString.length)
				// 转换成整形数组
				const intArray = new Uint8Array(arrayBuffer)
				const imgFile = this.imgFile
				// 填充进数组
				for (let i = 0; i < binaryString.length; i++) {
					intArray[i] = binaryString.charCodeAt(i)
				}
				// 定义数据
				const data = [intArray]
				let blob = ''
				try {
					blob = new Blob(data, {
						type: imgFile.type
					})
				} catch (error) {
					window.BlobBuilder = window.BlobBuilder || window.WebkitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
					if (error.name === 'TypeError' && window.BlobBuilder) {
						const builder = new window.BlobBuilder()
						builder.append(arrayBuffer)
					} else {
						// 提示：版本过低，不支持上传图片
						throw new Error('版本过低，不支持上传图片')
					}
				}
				// blob 转 file
				const fileOfBlob = new File([blob], imgFile.name)
				const formData = new FormData()
				// type
				formData.append('type', imgFile.type)
				// size
				formData.append('size', fileOfBlob.size)
				formData.append('name', imgFile.name)
				formData.append('lastModifiedDate', imgFile.lastModifiedDate)
				// append 文件
				formData.append('file', fileOfBlob)
				// 上传图片
				this.uploadImg(formData)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>