import React from 'react';
import { notification, Button } from 'antd';
import {
    ArrowRightOutlined,
    ArrowLeftOutlined
  } from '@ant-design/icons';
import "./Testimonial.css";

export default class Testimonial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slider: null,
            initialCounter: 1,
            indexReview: 0
        };
    }

    componentDidMount(){
        let menuItemsUrl = "https://raw.githubusercontent.com/Bernabe-Felix/Bellotero/master/page1.json"
        fetch(menuItemsUrl, {
            method: "GET",
          }).then(function (res) {
            return res.json();
          }).then( function (data) {
              if (data && data.slider ) {
                  this.setState({
                      slider: data.slider
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
        if( this.state.initialCounter < this.state.slider.reviews.length ){
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

    render() {
        return (
            <div>
                <div className="testimonial-title">
                    <div className={"Our-customers-love-u"}>{ this.state.slider && this.state.slider.title }</div>
                </div>

                <div className="testimonial-reviews">
                    <span className={"testimonial-name"}  >{ this.state.slider && this.state.slider.reviews !== null && this.state.slider.reviews[this.state.indexReview].name }</span>
                    <span className={"testimonial-position"} >{ this.state.slider && this.state.slider.reviews !== null && this.state.slider.reviews[this.state.indexReview].position }</span>
                    <div className={"testimonial-comment"} >{ this.state.slider && this.state.slider.reviews !== null && this.state.slider.reviews[this.state.indexReview].comment }</div>
                </div>

                <div className={"number-of-reviews"}>
                    <span className={"counter"}>  { this.state.initialCounter + "/" + (this.state.slider && this.state.slider.reviews !== null ? this.state.slider.reviews.length : "") }  </span>
                </div>

                
                <Button type="primary"   className={"button-left"} onClick={this.handleNextReview} icon={<ArrowLeftOutlined />} />
                <Button type="primary"   className={"button-right"} onClick={this.handleNextReview} icon={<ArrowRightOutlined />} />
            </div>
        );
    }
}
