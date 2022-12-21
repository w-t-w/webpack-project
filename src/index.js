import {createRoot} from 'react-dom/client';
import {useEffect, useRef, useState} from 'react';

import {back, question, forward} from './assets/images';

import './styles/index.less';

const App = () => {
    const headerRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('auto');

    useEffect(() => {
        const headerHeight = headerRef.current.clientHeight;
        setContentHeight(`calc(100% - ${headerHeight}px)`);
    }, []);

    return (
        <div className='container'>
            <div className='container-header' ref={_ref => headerRef.current = _ref}>
                <div className='container-header-nav'>
                <span className='container-header-nav-back'>
                    <img src={back} alt='back'/>
                    返回
                </span>
                    <div className='container-header-nav-title'>
                        收入纳税明细查询
                    </div>
                    <span className='container-header-nav-callbacks'>
                    批量申诉
                </span>
                </div>
                <div className='container-header-total'>
                    <div className='container-header-total-price'>
                        <span className='container-header-total-price-personal'>收入合计<img src={question}
                                                                                             alt='question'/>：</span>
                        <span>234998.65元</span>
                    </div>
                    <hr className='container-header-total-price-line'/>
                    <div className='container-header-total-price'>
                        <span>已申报税额合计：</span>
                        <span>8321.92元</span>
                    </div>
                </div>
            </div>
            <div className='container-content' style={{height: contentHeight}}>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-12</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：上海界众网络科技有限公司
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：25000.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：1562.50元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-11</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：上海界众网络科技有限公司
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：25000.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：1562.50元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-10</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：上海界众网络科技有限公司
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：25000.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：1230.00元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-09</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：上海界众网络科技有限公司
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：25000.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：468.75元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-08</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：上海界众网络科技有限公司
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：25000.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：468.75元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-05</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：3120.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：0.00元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-04</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：19643.68元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：1114.37元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-03</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入：20800.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：432.00元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-02</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入： 20800.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：369.00元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-01</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：正常工资薪金
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入： 20800.00元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：369.00元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
                <div className='container-content-item'>
                    <div className='container-content-item-header'>
                        <span>工资薪金</span>
                        <span className='container-content-item-month'>2021-01</span>
                    </div>
                    <div className='container-content-item-main'>
                        <div className='container-content-item-main-count'>
                            所得项目小类：全年一次性奖金收入
                        </div>
                        <div className='container-content-item-main-count'>
                            扣缴义务人：虎扑（上海）文化传播股...
                        </div>
                        <div className='container-content-item-main-count'>
                            收入： 24834.97元
                        </div>
                        <div className='container-content-item-main-count'>
                            已申报税额：745.05元
                        </div>
                    </div>
                    <div className='container-content-item-forward'>
                        <img src={forward} alt='forward'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(<App/>);
