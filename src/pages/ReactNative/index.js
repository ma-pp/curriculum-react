import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  IntroNative,
  expandActions,
  detailCurriculumActions
} from "../../redux/actions/IntroActions";
import "./styles.scss";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Data from "../../config/reactnative.json";

class Index extends Component {
  render() {
    const { expandNative, dataNative, indexId } = this.props;
    return (
      <>
        <Header />
        <Navbar />
        <div className="container-modern-intro">
          <p className="title-top">React Native Curriculum</p>
          {Data.map((item, index) => {
            const { id, title, master } = item;
            return (
              <Card key={id}>
                <div className="row">
                  <div className={expandNative && this.props.idNative == index + 1 ? "wrapper-title animasi" : "wrapper-title"}>
                    <p className="title">Session {index+1} - {title}</p>
                  </div>                  
                  {expandNative && this.props.idNative == index + 1 ? (
                    <div
                      className="button-detail button-rotate-up"
                      onClick={() => this.props.expandActions()}
                    >
                      <i className="fa fa-angle-up color-icon" />
                    </div>
                  ) : (
                    <div
                      className="button-detail-active button-rotate"
                      onClick={() => this.props.IntroNative(master, id, true, 'reactnative')}
                    >
                      <i className="fa fa-angle-up color-icon" />
                    </div>
                  )}
                </div>
                {expandNative && this.props.idNative == index + 1
                  ? dataNative.map((detail, indexId) => {
                      return (
                        <ul key={detail.title}>
                          <li className="text-detail">
                            {detail.title}{" "}
                            <Link
                              to="/detail"
                              className="italic"
                              onClick={() =>
                                [this.props.detailCurriculumActions(detail, indexId+1), this.props.IntroNative(master, id, true, 'reactnative')]
                              }
                            >
                              [ lihat detail ]
                            </Link>
                          </li>
                          {_.isArray(detail.detail)
                            ? detail.detail.map((i, index) => {
                                return (
                                  <ul key={index}>
                                    <li className="text-detail">
                                      {index + 1}. {i}
                                    </li>
                                  </ul>
                                );
                              })
                            : null}
                        </ul>
                      );
                    })
                  : null}
              </Card>
            );
          })}
        </div>        
      </>
    );
  }
}

const mapStateToProps = state => {
  const { dataNative, idNative, expandNative } = state.introReducer;
  return {
    dataNative,    
    idNative,
    expandNative    
  };
};

export default connect(
  mapStateToProps,
  {
    IntroNative,
    expandActions,
    detailCurriculumActions
  }
)(Index);
