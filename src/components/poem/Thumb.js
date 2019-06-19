import React from "react";
import Loader from "react-loader-spinner";

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.image) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.image);
    });
  }

  render() {
    const { image } = this.props;
    const { loading, thumb } = this.state;

    if (!image) {
      return null;
    }

    if (loading) {
      return (
        <div className="loader">
          <Loader type="Oval" color="#f1f1f1" height={30} width={30} />
        </div>
      );
    }

    return (
      <div className="img-thumb-wrapper">
        <img src={thumb} alt={image.name} className="img-thumbnail" />
      </div>
    );
  }
}

export default Thumb;
