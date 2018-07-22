const styles = {
    resize: {
      fontSize: 33,
      textAlign: 'right',
      fontWeight: bold
    }
  }

const CalculateField = (props) => {
  const { classes } = props;
  return (
    <TextField className="Calculate-field"
    id="calculate"
    label=""
    margin="normal"
    InputProps={{classes: {input: classes.resize}}}
    autoFocus={true}
    onChange={this.calculateChange}
  /> 
  );
}

export default withStyles(styles)(CalculateField);