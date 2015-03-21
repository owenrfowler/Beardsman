# More info at https://github.com/guard/guard#readme

# Exlcude reference directory
ignore %r{^_resources}, /public/, /locales/
ignore %r{^.sass-cache}, /public/

# Use, something, to JS your JS bits.
guard 'sprockets', :asset_paths => '_dev/js', :root_file => '_dev/js/site.js', :destination => 'assets', :minify => true do
  watch(%r{..\/js\/.*\.js$})
end

# watch standard shopify folders and upload files when the change
guard 'shell' do
  watch %r{^(assets|config|layout|snippets|templates)\/.*} do |m|
    `bundle exec theme upload #{m[0]}`
  end
end

# Guard::Compass
#
# You don't need to configure watchers for guard 'compass' declaration as they generated
# from your Compass configuration file. You might need to define the Compass working directory
# and point to the configuration file depending of your project structure.
#
# Available options:
#
# * working_directory: Define the Compass working directory, relative to the Guardfile directory
# * configuration_file: Path to the Compass configuration file, relative to :project_path
#
# Like usual, the Compass configuration path are relative to the :project_path

# guard 'compass', project_path: 'not_current_dir', configuration_file: 'path/to/my/compass_config.rb'

guard :compass, configuration_file: 'compass_config.rb',
  compile_on_start: true do
    watch(%r{..\/sass\/.*\.sass$})
  end
