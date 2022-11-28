// import Box from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'
import { MeasurementUnits } from '../../constants/units'
import { Checkbox, FormControlLabel, MenuItem } from '@material-ui/core'

const measurementUnitKeys = Object.keys(MeasurementUnits)
const date = new Date()
class InventoryFormModal extends React.Component {
  render() {
    const {
      formName,
      handleDialog,
      products,
      handleInventory,
      title,
      initialValues
    } = this.props
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            handleInventory(values)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent >
                  <Grid container direction={'column'} spacing = {2}>
                    <Grid item xs={12} sm={12} m={2}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        name='name'
                        label='Name'
                        required
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Field
                      select
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='productType'
                      label='Product Type'
                      component={TextField}
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product}>
                            {product.name}
                              </MenuItem>
                            ))}
                        
                      </Field>
                      
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true}}
                        name='description'
                        label='Description'
                        component={TextField}
                      />
                    </Grid>
                      <Grid item xs={12} sm={12} >
                        <Field
                          custom={{ variant: 'outlined', fullWidth: true, }}
                          inputProps = {{inputMode: 'numeric'}}
                          name='averagePrice'
                          label='Average Price'
                          type='number'
                          defaultValue = "0"
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Field
                          custom={{ variant: 'outlined', fullWidth: true, }}
                          inputProps = {{inputMode: 'numeric'}}
                          name='amount'
                          label='Amount'
                          type='number'
                          defaultValue = "0"
                          component={TextField}
                        />
                      </Grid>
                    <Grid item xs={12} sm={12}>
                    

                    <Field
                    select
                    required
                    custom={{ variant: 'outlined', fullWidth: true, }}
                    name='unitOfMeasurement'
                    label='Unit of Measurement'
                    component={TextField}
                    >
                      {measurementUnitKeys.map((option) => (
                        <MenuItem key={MeasurementUnits[option].abbreviation} value={option}>
                          {MeasurementUnits[option].name}
                            </MenuItem>
                          ))}
                      
                    </Field>
                    
                      
                    
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <Field
                        custom={{ variant: 'outlined', fullWidth: true, }}
                        type="date"
                        name='bestBeforeDate'
                        label='Best before date'
                        defaultValue = {date.getFullYear()+'-'+ (date.getMonth()+1) +"-"+date.getDate()}
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Field
                          custom={{ variant: 'outlined', fullWidth: true, }}
                          defaultValue = {false}
                          control={<Checkbox/>}
                          name='neverExpires'
                          label='Never Expires'
                          labelPlacement='start'
                          required
                          component={FormControlLabel}
                        />
                      
                    </Grid>
                  </Grid>
                  
                 

                 
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryFormModal
