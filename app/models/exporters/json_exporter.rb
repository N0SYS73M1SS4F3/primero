module Exporters
  class JSONExporter < BaseExporter
    class << self
      def id
        'json'
      end

      def export(models, properties, *args)
        hashes = models.map {|m| convert_model_to_hash(m, properties_to_export(properties)) }

        JSON.pretty_generate(hashes)
      end
    end
  end
end
