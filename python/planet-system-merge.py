import pandas as pd
import json
import sys
import os

def merge_planet_system_data(planets_file, systems_file, output_file=None):
    """
    Merge planet data with system data based on sector, region, and grid.
    Creates new rows for systems that don't match any planets.
    
    Args:
        planets_file (str): Excel file with columns: Known Planet Name,X,Y,RA,Dec,Rand. Dist.,Region,Sector,Grid,Link,technicalId
        systems_file (str): Excel file with columns: system,sector,region,grid
        output_file (str): Optional path to save merged Excel file
    
    Returns:
        dict: Result with success status, data, and statistics
    """
    
    try:
        # Read both Excel files
        planets_df = pd.read_excel(planets_file)
        systems_df = pd.read_excel(systems_file)
        
        print(f"Planets file shape: {planets_df.shape}")
        print(f"Systems file shape: {systems_df.shape}")
        
        # Clean column names (remove extra spaces)
        planets_df.columns = planets_df.columns.str.strip()
        systems_df.columns = systems_df.columns.str.strip()
        
        # Expected columns
        expected_planet_cols = ['Known Planet Name', 'X', 'Y', 'RA', 'Dec', 'Rand. Dist.', 'Region', 'Sector', 'Grid', 'Link', 'technicalId']
        expected_system_cols = ['System', 'Sector', 'Region', 'Grid']
        
        # Verify required matching columns exist
        required_match_cols = ['Sector', 'Region', 'Grid']  # Capitalized for planets file
        missing_planet_cols = [col for col in required_match_cols if col not in planets_df.columns]
        missing_system_cols = [col.lower() for col in required_match_cols if col.lower() not in systems_df.columns]
        
        if missing_planet_cols:
            raise ValueError(f"Missing columns in planets file: {missing_planet_cols}")
            
        if missing_system_cols:
            raise ValueError(f"Missing columns in systems file: {missing_system_cols}")
        
        # Create merge keys (normalize case and handle NaN values)
        def create_merge_key(row):
            return '|'.join([str(val).upper().strip() if pd.notna(val) else 'NULL' for val in row])
        
        planets_df['_merge_key'] = planets_df[['Sector', 'Region', 'Grid']].apply(create_merge_key, axis=1)
        systems_df['_merge_key'] = systems_df[['sector', 'region', 'grid']].apply(create_merge_key, axis=1)
        
        print(f"Sample planet merge keys: {planets_df['_merge_key'].head(3).tolist()}")
        print(f"Sample system merge keys: {systems_df['_merge_key'].head(3).tolist()}")
        
        # Perform full outer join to include all records from both files
        merged_df = pd.merge(
            planets_df,
            systems_df[['_merge_key', 'system', 'sector', 'region', 'grid']],
            on='_merge_key',
            how='outer',
            suffixes=('', '_from_systems')
        )
        
        # For records that only exist in systems file (no planet match),
        # fill in the sector/region/grid columns from the systems data
        merged_df['Sector'] = merged_df['Sector'].fillna(merged_df['sector_from_systems'].str.title())
        merged_df['Region'] = merged_df['Region'].fillna(merged_df['region_from_systems'].str.title())
        merged_df['Grid'] = merged_df['Grid'].fillna(merged_df['grid_from_systems'].str.upper())
        
        # Clean up duplicate columns
        columns_to_drop = ['sector_from_systems', 'region_from_systems', 'grid_from_systems', '_merge_key']
        merged_df = merged_df.drop([col for col in columns_to_drop if col in merged_df.columns], axis=1)
        
        # Calculate statistics
        total_rows = len(merged_df)
        original_planet_records = merged_df['Known Planet Name'].notna().sum()
        new_system_records = merged_df['Known Planet Name'].isna().sum()
        records_with_system_data = merged_df['system'].notna().sum()
        
        stats = {
            'total_rows': total_rows,
            'original_planet_records': int(original_planet_records),
            'new_system_records': int(new_system_records),
            'records_with_system_data': int(records_with_system_data),
            'planets_without_systems': int(original_planet_records - merged_df[(merged_df['Known Planet Name'].notna()) & (merged_df['system'].notna())].shape[0])
        }
        
        print(f"\nMerge Results:")
        print(f"Total records in final table: {stats['total_rows']}")
        print(f"Original planet records: {stats['original_planet_records']}")
        print(f"New system-only records added: {stats['new_system_records']}")
        print(f"Records with system data: {stats['records_with_system_data']}")
        print(f"Planets without matching systems: {stats['planets_without_systems']}")
        
        # Save to Excel if requested
        if output_file:
            merged_df.to_excel(output_file, index=False)
            print(f"\nMerged data saved to: {output_file}")
        
        # Convert to JSON-serializable format
        merged_clean = merged_df.where(pd.notnull(merged_df), None)
        data_records = merged_clean.to_dict('records')
        
        return {
            'success': True,
            'data': data_records,
            'stats': stats,
            'columns': list(merged_df.columns)
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'data': [],
            'stats': {}
        }

def main():
    """Main function for command line usage or API calls"""
    
    if len(sys.argv) >= 3:
        # Command line usage
        planets_file = sys.argv[1]
        systems_file = sys.argv[2]
        output_file = sys.argv[3] if len(sys.argv) > 3 else None
        
        result = merge_planet_system_data(planets_file, systems_file, output_file)
        
        if result['success']:
            print(f"\n✅ Success! Final table has {result['stats']['total_rows']} records")
            
            # Save JSON version
            json_output = f"{output_file.replace('.xlsx', '.json')}" if output_file else 'merged_planets_systems.json'
            with open(json_output, 'w') as f:
                json.dump(result, f, indent=2, default=str)
            print(f"JSON data saved to: {json_output}")
        else:
            print(f"❌ Error: {result['error']}")
            sys.exit(1)
    else:
        # API usage - expect environment variables or default files
        planets_file = os.environ.get('PLANETS_FILE', 'planets.xlsx')
        systems_file = os.environ.get('SYSTEMS_FILE', 'systems.xlsx')
        
        result = merge_planet_system_data(planets_file, systems_file)
        
        # Output JSON for API consumption
        print(json.dumps(result, default=str))

if __name__ == "__main__":
    main()