<template>
	<div class="notification">
		<div class="item" :class="{ 'item_active': type == 0 }" @click="getNotification(0)">
			<div class="left">
				<div class="tit ht">选择两个模型匿名对战</div>
				<div class="text fs">2个匿名模型对战</div>
			</div>
			<div class="icon">
				<img src="@/assets/home/sj.png" mode="scaleToFill" />
			</div>
		</div>
		<div class="item" :class="{ 'item_active': type == 1 }" @click="getNotification(1)">
			<div class="left">
				<div class="tit ht">⽐较两个选定的模型</div>
				<div class="text fs">并排比较你选择的两个模型</div>
			</div>
			<div class="icon">
				<img src="@/assets/home/zx.png" mode="scaleToFill" />
			</div>
		</div>
		<div class="versus fs" v-if="type == 1">
			<div class="versus_left ht" @click="openSelector('left')">
				<div class="versus_img">
					<img :src="selectedLeft.image" alt="">
				</div>
				<div class="versus_name">{{ selectedLeft.name }}</div>
				<div class="versus_icon">
					<img src="@/assets/homeFrom/top.png" alt="">
					<!-- <img src="@/assets/homeFrom/bottom.png" alt=""> -->
				</div>
			</div>
			VS
			<div class="versus_right ht" @click="openSelector('right')">
				<div class="versus_img">
					<img :src="selectedRight.image" alt="">
				</div>
				<div class="versus_name">
					{{ selectedRight.name }}
				</div>
				<div class="versus_icon">
					<!-- <img src="@/assets/homeFrom/top.png" alt=""> -->
					<img src="@/assets/homeFrom/bottom.png" alt="">
				</div>
			</div>
		</div>
		<div class="btn fs" @click="nvtoClick()">
			获取AI评价
		</div>

		<!-- 选择框弹出层 -->
		<div class="selector-overlay" v-if="showSelector" @click="hideSelector">
			<div class="selector-modal" @click.stop>
				<div class="selector-header">
					<div class="search-box">
						<input type="text" v-model="searchText" placeholder="搜索模型..." class="search-input">
					</div>
				</div>
				<div class="selector-content">
					<div v-for="option in filteredOptions" :key="option.id" class="option-item"
						:class="{ 'selected': isOptionSelected(option) }" @click="selectOption(option)">
						<div class="option-img">
							<img :src="option.image" alt="">
						</div>
						<div class="option-name">{{ option.name }}</div>
						<div class="option-check" v-if="isOptionSelected(option)">
							✓
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import { showDebugDirtyRect } from 'zrender';
import axios from 'axios'

export default {
	name: 'notificationFrom',
	props: {
		battleItem: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			type: 0,
			notificationList: [],
			showSelector: false,
			currentSide: '', // 当前选择的是左侧还是右侧
			searchText: '',
			selectedLeft: { id: 1, name: 'doubao-seed', image: require('@/assets/AIAvatar/doubao.png') },
			selectedRight: { id: 2, name: 'openai-GPT5', image: require('@/assets/AIAvatar/openai.png') },
			allOptions: [
				{ id: 1, name: 'doubao-seed', image: require('@/assets/AIAvatar/doubao.png') },
				{ id: 2, name: 'openai-GPT5', image: require('@/assets/AIAvatar/openai.png') },
				{ id: 3, name: 'tencent-hunyuan', image: require('@/assets/AIAvatar/hunyuan.png') },
				{ id: 4, name: 'stepfun-ai', image: require('@/assets/AIAvatar/stepfun.png') },
				{ id: 5, name: 'google/gemini-2.5-pro', image: require('@/assets/AIAvatar/gemini.png') },
				{ id: 6, name: 'z-ai/glm-4.5v', image: require('@/assets/AIAvatar/z-ai.jpeg') },
			]
		}
	},
	computed: {
		filteredOptions() {
			return this.allOptions.filter(option =>
				option.name.toLowerCase().includes(this.searchText.toLowerCase())
			);
		}
	},
	methods: {
		getNotification(index) {
			this.type = index
		},
		nvtoClick() {
			this.$router.push('/evaluate');
			console.log('evaluate:' + this.battleItem.id);
			this.evaluatePic(this.battleItem.id);
		},
		async evaluatePic(id) {
			console.log('评价图片   ' + id);
			const url = `http://47.122.63.229:5055/api/artwork/evaluate`
			const payload = {
				artwork_id: id
			};
			const res = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
			//处理返回结果
			// console.log('评价结果   ' + res.data.task_id);
			console.log('评价任务   ' + JSON.stringify(res.data, null, 2));
			if (!res.data.task_id) {
				this.$store.commit('setAssessA', '评价任务创建失败，请稍后重试');
				this.$store.commit('setAssessB', '评价任务创建失败，请稍后重试');
			} else {
				this.$store.commit("setModelAName", res.data.model_name0);
				this.$store.commit("setModelBName", res.data.model_name1);
				this.$store.commit('setAssessA', '正在生成审美评估……');
				this.$store.commit('setAssessB', '正在生成审美评估……');
				this.startPolling(res.data.task_id);
			}
		},
		startPolling(task_id) {
			let count = 0;
			const maxCount = 10 * 60 / 2; // 10分钟，每2秒一次
			this.pollingTimer = setInterval(async () => {
				const res = await this.getEvalucationText(task_id);
				count++;
				console.log('评价任务状态   ' + JSON.stringify(res.data, null, 2));
				if (res.data.status === 'processing') {
					// 任务仍在处理中，继续轮询
					console.log('评价任务处理中...');
					this.$store.commit('setAssessA', res.data.progress);
					this.$store.commit('setAssessB', res.data.progress);
				} else if (res.data.status === 'completed') {
					// 任务完成，处理结果并停止轮询
					console.log('评价任务完成');
					// 判空处理，避免 undefined 取属性
					const evalA = res.data.evaluations[this.$store.state.modelA_name];
					const evalB = res.data.evaluations[this.$store.state.modelB_name];
					this.$store.commit('setAssessA', evalA && evalA.response ? evalA.response : '未获取到模型A评估结果');
					this.$store.commit('setAssessB', evalB && evalB.response ? evalB.response : '未获取到模型B评估结果');
					clearInterval(this.pollingTimer);
				} else if (res.data.status === 'error') {
					// 任务失败，处理错误并停止轮询
					console.log('评价任务失败');
					this.$store.commit('setAssessA', '评价任务失败，请稍后重试');
					this.$store.commit('setAssessB', '评价任务失败，请稍后重试');
					clearInterval(this.pollingTimer);
				}
				if (count >= maxCount) {
					clearInterval(this.pollingTimer);
				}
			}, 2000);
		},
		//获取评价文本
		async getEvalucationText(task_id) {
			const url = `http://47.122.63.229:5055/api/task/` + task_id + `/status`
			console.log('获取评价任务状态   ' + url);
			const res = await axios.get(url);
			return res;
		},
		openSelector(side) {
			this.showSelector = true;
			this.searchText = ''; // Clear search text when opening
			this.currentSide = side; // Track which side is being selected
			if (side === 'left') {
				this.selectedLeft = { ...this.selectedLeft }; // Keep current selection
			} else {
				this.selectedRight = { ...this.selectedRight }; // Keep current selection
			}
		},
		hideSelector() {
			this.showSelector = false;
		},
		selectOption(option) {
			if (this.currentSide === 'left') {
				this.selectedLeft = option;
			} else {
				this.selectedRight = option;
			}
			this.hideSelector();
		},
		isOptionSelected(option) {
			if (this.currentSide === 'left') {
				return this.selectedLeft.id === option.id;
			} else {
				return this.selectedRight.id === option.id;
			}
		}
	}
}
</script>
<style lang="less" scoped>
.notification {
	width: 272px;
	min-height: 169px;
	background: #FFFFFF;
	box-shadow: 4px 4px 60px 0px rgba(0, 0, 0, 0.25);
	border-radius: 12px 12px 12px 12px;
	padding: 14px 16px;
	box-sizing: border-box;
	position: absolute;
	top: 80px;
	left: 0;
	right: 0;
	margin: 0 auto;
	z-index: 100;

	.versus {
		margin: 12px 0 8px 0;
		height: 22px;
		display: flex;
		line-height: 22px;
		font-weight: 400;
		font-size: 12px;
		color: #212121;
		justify-content: space-between;

		.versus_left {
			width: 108px;
			height: 22px;
			background: #FFFFFF;
			border-radius: 11px 11px 11px 11px;
			border: 1px solid #9F9F9F;

		}

		.versus_right {
			width: 108px;
			height: 22px;
			background: #FFFFFF;
			border-radius: 11px 11px 11px 11px;
			border: 1px solid #9F9F9F;
		}

		.versus_left,
		.versus_right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 5px;
			box-sizing: border-box;

			.versus_img {
				width: 18px;
				height: 17px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.versus_name {
				font-weight: 400;
				font-size: 12px;
				color: #000000;

				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.versus_icon {
				width: 11px;
				height: 12px;
				margin-top: -6px;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.item {
		width: 240px;
		height: 48px;
		border-radius: 4px 4px 4px 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32px 0 33px;
		box-sizing: border-box;

		.left {
			.tit {
				height: 16px;
				font-weight: 300;
				font-size: 14px;
				color: #000000;
				height: 16px;
			}

			.text {
				margin-top: 4px;
				height: 16px;
				font-weight: 400;
				font-size: 12px;
				color: #757575;
				line-height: 16px;
			}
		}

		.icon {
			width: 16px;
			height: 16px;

			img {
				width: 100%;
				height: 100%;
			}
		}


	}

	.item_active {
		background: #D9D9D9;
	}

	.btn {
		margin: 0 auto;
		margin-top: 12px;
		width: 175px;
		height: 33px;
		background: #B53334;
		border-radius: 16px 16px 16px 16px;
		line-height: 33px;
		text-align: center;
		font-weight: 400;
		font-size: 14px;
		color: #FFFFFF;
	}

	/* 选择框样式 */
	.selector-overlay {
		position: fixed;
		top: 230px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease;
	}

	.selector-modal {
		width: 237px;
		height: fit-content;
		background: #FFFFFF;
		box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25), -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
		border-radius: 12px 12px 12px 12px;
		border: 1px solid #000000;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}

	.selector-header {
		border-bottom: 1px solid #E8E8E8;
		background: #FAFAFA;
	}

	.search-box {
		width: 100%;
		height: 38px;
		background: #FFFFFF;
		border: 1px solid #D9D9D9;
		display: flex;
		align-items: center;
		padding: 0 16px;
		box-sizing: border-box;
		transition: border-color 0.2s ease;

		// &:focus-within {
		// 	border-color: #B53334;
		// }
	}

	.search-input {
		flex: 1;
		height: 100%;
		border: none;
		background: none;
		font-size: 14px;
		color: #333333;
		outline: none;
		font-family: inherit;

		&::placeholder {
			color: #999999;
		}
	}

	.selector-content {
		// overflow-y: auto;
		padding: 8px 4px 0 3px;
		box-sizing: border-box;

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: #F5F5F5;
		}

		&::-webkit-scrollbar-thumb {
			background: #CCCCCC;
			border-radius: 3px;
		}
	}

	.option-item {
		// width: 230px;
		height: 23px;
		margin: 0 auto;
		background: #FFFFFF;
		border-radius: 4px 4px 4px 4px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-bottom: 4px;
		position: relative;

		&:hover {
			background-color: #F0F0F0;
		}

		&.selected {
			background: #D9D9D9;
		}

		&:last-child {
			margin-bottom: 0;
		}
	}

	.option-img {
		width: 15px;
		height: 15px;
		margin-right: 12px;
		margin-top: -15px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.option-name {
		font-size: 12px;
		color: #333333;
		font-weight: 400;
		flex: 1;
	}

	.option-check {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333333;
		font-size: 12px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}

		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
}
</style>