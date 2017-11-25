const React = require('react')
import styles from './wrap.css'
// import fa from './font-awesome.css'
// import ReactSVG from 'react-svg';
import {menu, about, device, log, wechat} from './svg/svg.js'
class MDevWrap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top: '0', //触摸按钮初始位置（距离左边顶部的位置）
            left: '0',
            startX: '', //触摸按钮初始的坐标
            startY: '',
            x: 0, //记录触摸按钮触摸后有无变化
            y: 0,
            height: document.documentElement.clientHeight, //屏幕可视宽高
            width: document.documentElement.clientWidth,
            px: 0,
            py: 0
        }
    }
    handleStart(e) {
        e.preventDefault();
        const {top, left} = this.state; //取得初始坐标和屏幕可视宽高
        //前面原生js用的是touches,其实还有一个targetTouches，在这两个的输出结果是一致的。
        this.setState({ //当触摸开始时候，记录当时的坐标值，还有设置触摸变化的xy轴的变化为0，因为当新一轮触摸开始时候，必须重新设置，相当于初始化
            startX: e.targetTouches[0].clientX,
            startY: e.targetTouches[0].clientY,
            x: 0,
            y: 0,
            px: e.targetTouches[0].clientX - left,
            py: e.targetTouches[0].clientY - top
        });
    }
    handleTouchMove(e) {
        const {
            startX,
            startY,
            width,
            height,
            px,
            py
        } = this.state; //取得初始坐标和屏幕可视宽高
        const left = parseInt(e.touches[0].clientX) - 48 <= 0 || parseInt(e.touches[0].clientX) >= width - 48
            ? (parseInt(e.touches[0].clientX) - 48 <= 0
                ? 0
                : width - 48)
            : parseInt(e.touches[0].clientX)
        const top = parseInt(e.touches[0].clientY) - 48 <= 0 || parseInt(e.touches[0].clientY) >= height - 48
            ? (parseInt(e.touches[0].clientY) - 48 <= 0
                ? 0
                : height - 48)
            : parseInt(e.touches[0].clientY)
        this.setState({
            //设置当前的坐标位置，思路和上面原生的一样，不过由于react有实时变化的状态机state，所以在此用touches，targetTouches
            //都可以来设置实时变化的值，不用用到changedTouches；
            x: e.touches[0].clientX - startX, //当前触摸点-初始坐标取得实时变化值
            y: e.touches[0].clientY - startY,
            left: left - px,
            top: top - py
        });
    }

    handleTouchEnd(e) {
        const {x, y} = this.state;
        if (x == 0 && y == 0) { //触摸结束后，判断实时变化值有没变化，没变化则视为点击事件。
            // window.location.href = '#';
            //  this.props.show()

        };
    }

    open(e) {
      e.preventDefault();
      this.refs.MDev.classList.toggle(styles.open);
    }

    render() {
        const {top, left, height, width} = this.state; //取得实时状态机state的值
        var fa = {}
        return (
            <div style={{
                top,
                left
            }} ref={'MDev'} className ={styles.MDev} onTouchStart={this.handleStart.bind(this)} onTouchMove ={this.handleTouchMove.bind(this)} onTouchEnd ={this.handleTouchEnd.bind(this)}>
                {this.props.children}

                <div className={styles.ring}>
                  {
                    [about, device, log, wechat, about, device, log, wechat].map((svg, i) => <a href="#" key={i} style={{
                      left: (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/8)*i*Math.PI)).toFixed(4) + "%",
                      top: (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/8)*i*Math.PI)).toFixed(4) + "%"
                    }}  className={`${styles.menuItem}`}>{svg}</a>)
                  }

                </div>
                <div ref={'center'}  onTouchStart={this.open.bind(this)}  className={`${styles.center}`}>{menu}</div>
            </div>
        );
    }
}

module.exports = MDevWrap
