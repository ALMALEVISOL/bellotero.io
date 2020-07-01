import React from 'react';
import { Slider, InputNumber, Row, Col, notification, Button } from 'antd';
import "./Configurator.css";
import 'antd/dist/antd.css';

export default class Configurator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: 1,
            employeesValue: 1,
            foodCost: 0,
            annualSavings: 0
        };
    }

    componentDidMount(){
        let menuItemsUrl = "https://raw.githubusercontent.com/Bernabe-Felix/Bellotero/master/page2.json"
        fetch(menuItemsUrl, {
            method: "GET",
          }).then(function (res) {
            return res.json();
          }).then( function (data) {
              if (data && data.calculator ) {
                  this.setState({
                      calculator: data.calculator
                  })
              }
        }.bind(this)).catch(function (error) {
            notification.error({
                message: "Error",
                description:
                  "¡Ocurrió un error al intentar conectarse con el servidor!",
                duration: 10
              });
            });
    }

    handleNextReview = () => {
        if( this.state.initialCounter < this.state.calculator.reviews.length ){
            this.setState({
                initialCounter: this.state.initialCounter + 1,
                indexReview: this.state.indexReview + 1
            })
        }else{
            this.setState({
                initialCounter: 1,
                indexReview: 0
            })
        }
    }

    handleMonthlyIngredientChange = value => {
        this.setState({
            inputValue: value,
            foodCost: (value * 0.3).toFixed(3),
            annualSavings: (this.state.employeesValue * 1337 + ( value * 0.3 )).toFixed(3)
        });
    };

    handleFullTimeEmployeesChange = value => {
        this.setState({
            employeesValue: value,
            foodCost: (this.state.inputValue * 0.3).toFixed(3),
            annualSavings: (value * 1337 + ( this.state.inputValue * 0.3 )).toFixed(3)
        });
    };

    render() {
        const { inputValue } = this.state;
        return (
            <div>
                <div className="calculator-title">
                    <div className={"Our-customers-love-u"}>{ this.state.calculator && this.state.calculator.title }</div>
                </div>

                <div className="With-Belloteroio-yo">
                    <span className={"calculator-description"} >{ this.state.calculator && this.state.calculator.description  }</span>
                </div>
 

                <Row className={"monthly-ingredient"} >
                    <Col span={6}>
                        <span className={"Monthly-ingredient-s"} > Monthly ingredient spending  </span>
                    </Col>
                    <Col span={8}>
                        <InputNumber
                            min={10}
                            max={100}
                            style={{ margin: '0 16px' }}
                            step={0.001}
                            value={inputValue}
                            onChange={this.onChange}
                            className={"ingredient-number input-number-ingredient"}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Col>
                    <Slider
                        style={{width: "535px", }}
                        min={10}
                        max={100}
                        onChange={this.handleMonthlyIngredientChange }
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Row>
                

                <Row className={"employees"} >
                    <Col span={10}>
                        <span className={"Full-time-employees"} >Full-time employees that process invoices</span>
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={10}
                            style={{ margin: '0 16px' }}
                            className={"input-number-employees"}
                            value={this.state.employeesValue}  
                            onChange={this.onChange}
                        />
                    </Col>
                    <Slider
                        style={{width: "535px" }}
                        min={1}
                        max={10}
                        onChange={this.handleFullTimeEmployeesChange }
                        className={"employees-slider"}
                        value={typeof this.state.employeesValue === 'number' ? this.state.employeesValue : 0}
                    />
                </Row>


                <Row className={"results"} >
                    <Col span={10}>
                        <span  className={"results-text estimated-annual"}> $ { this.state.foodCost }  </span>
                        <span  className={"results-text-cost-food-label"} > Estimated cost food savings  </span>
                    </Col>
                    <Col span={10}>
                        <span className={"results-text"} >  $ { this.state.annualSavings }  </span>
                        <span className={"results-text-estimated-label"} >  Your estimated annual savings  </span>
                    </Col>
                </Row>

            </div>
        );
    }
}
