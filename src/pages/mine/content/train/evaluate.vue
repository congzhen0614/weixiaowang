<template>
	<div class="mine-train-evaluate">
		<!-- 头部 -->
		<section class="mine-train-evaluate-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">评价</p>
			<div class="submit-btn" @click="doSubmit()">
				提交
			</div>
		</section>
		<!-- 评分 -->
		<ul class="score-box">
			<li v-for="(item, index) in scoreList" class="score-item">
				<div class="left-part">
					<span class="text">{{ item.text }}</span>
				</div>
				<div class="right-part">
					<div class="star-list">
						<div v-for="(star, index2) in starList" @click="changeScore(index, index2)" class="star-item">
							<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
								<img v-if="index2 < item.score" src="./star_active.png">
							</transition>
							<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
								<img v-if="index2 >= item.score" src="./star.png">
							</transition>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<!-- 评价内容 -->
		<section class="evaluate-content">
			<div class="text-box">
				<textarea v-model="text" placeholder="请在此填写您的感受和评价"></textarea>
				<span class="limit">
					<span class="numbers" :class="{ red: text.length > 500 }">{{ text.length }}</span><span class="max">/500</span>
				</span>
			</div>
			<ul class="pic-list">
				<li v-if="picList && picList.length" v-for="(pic, index) in picList" class="pic-item">
					<img class="pic" :src="pic">
					<img class="close-icon" src="./close_icon.png" @click.prevent.stop="deleteItem(index)">
				</li>
				<li class="pic-item" @click="submitPic()">
					<input ref="file" type="file" name="image" accept="image/*" style="display: none;" @change="handleInputChange($event)">
					<img class="pic" src="./submit_pic_icon.png">
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				text: '',
				starList: [0, 1, 2, 3, 4],
				picList: [],
				scoreList: [{
					text: '服务',
					score: 0
				}, {
					text: '设施',
					score: 0
				}, {
					text: '价格',
					score: 0
				}],
				// 图片文件
				imgFile: {}
			}
		},
		computed: {
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 更改评分
			changeScore (index, index2) {
				this.scoreList[index].score = index2 + 1
			},
			// 上传图片
			submitPic () {
				this.$refs.file.click()
			},
			// 监听 input 改变
			handleInputChange (event) {
				console.log(event)
				let file = event.target.files[0]
				const imgMaxSize = 1024 * 1024 * 10 // 10MB
				// 检查文件类型
				if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
					// 不是图片格式文件
					this.Toast.warning({
						title: '请上传标准格式的图片'
					})
					return
				}
				// 文件大小限制
				if (file.size > imgMaxSize) {
					this.Toast.warning({
						title: '图片大小超过限制'
					})
					return
				}
				this.transformFileToDataUrl(file)
			},
			// 将 File append 进 FromData
			transformFileToFormData (file) {
				const formData = new FormData()
				formData.append('type', file.type)
				formData.append('size', file.size || 'image/jpeg')
				formData.append('name', file.name)
				formData.append('lastModifiedDate', file.lastModifiedDate)
				formData.append('file', file)
				// 上传图片，等接口
				// this.uploadImg(formData)
			},
			// 图片压缩
			transformFileToDataUrl (file) {
				const imgCompassMaxSize = 200 * 1024
				// 存储文件相关信息
				this.imgFile.type = file.type || 'image/jpeg'
				this.imgFile.size = file.size
				this.imgFile.name = file.name
				this.imgFile.lastModifiedDate = file.lastModifiedDate
				// 封装好的函数
				const reader = new FileReader()
				// file转dataURL是个异步函数，要将代码写在回调离
				reader.onload = (e) => {
					const result = e.target.result
					this.picList.push(result)
					if (result.length < imgCompassMaxSize) {
						this.compress(result, this.processData, false) // 图片不压缩
					} else {
						this.compress(result, this.processData) // 图片压缩
					}
				}
				reader.readAsDataURL(file)
			},
			// 使用 canvas 绘制图片并压缩
			compress (dataURL, callback, shouldCompress = true) {
				const img = new window.Image()
				img.src = dataURL
				img.onload = () => {
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')
					canvas.width = img.width
					canvas.height = img.height
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
					let compressedDataUrl = shouldCompress ? canvas.toDataURL(this.imgFile.type, 0.2) : canvas.toDataURL(this.imgFile.type, 1)
					callback(compressedDataUrl)
				}
			},
			processData (dataUrl) {
				// 这里使用二进制方式处理 dataUrl
				const binaryString = window.atob(dataUrl.split(',')[1])
				const arrayBuffer = new ArrayBuffer(binaryString.length)
				const intArray = new Uint8Array(arrayBuffer)
				const imgFile = this.imgFile
				for (let i = 0, j = binaryString; i < j; i++) {
					intArray[i] = binaryString.charCodeAt(i)
				}
				const data = [intArray]
				let blob = ''
				try {
					blob = new Blob(data, { type: imgFile.type })
				} catch (error) {
					window.BlobBuilder = window.BlobBuilder || window.WebkitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
					if (error.name === 'TypeError' && window.BlobBuilder) {
						const builder = new window.BlobBuilder()
						builder.append(arrayBuffer)
						blob = builder.getBlob(imgFile.type)
					} else {
						this.Toast.fail({
							title: '版本过低，不支持上传图片'
						})
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
				// this.uploadImg(formData)
			},
			// 上传图片
			uploadImg (formData) {
				const xhr = new XMLHttpRequest()
				// 监听进度
				xhr.upload.addEventListener('progress', e => {
					console.log(e.loaded / e.total)
				}, false)
				// 错误监听
				xhr.addEventListener('error', () => {
					this.Toast.fail({
						title: '上传失败！'
					})
				})
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4) {
						const result = JSON.parse(xhr.responseText)
						if (xhr.status === 200) {
							// 上传成功
							console.log(result)
						} else {
							// 上传失败
						}
					}
				}
				let _url = 'upload'
				xhr.open('POST', _url, true)
				xhr.send(formData)
			},
			// 删除单项
			deleteItem (index) {
				this.picList.splice(index, 1)
			},
			// 提交
			doSubmit () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './evaluate.styl'
</style>
